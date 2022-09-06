import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import {
  createEventEndpoint,
  deleteEventEndpoint,
  ICalendar,
  IEditingEvent,
  updateEventEndpoint,
} from "./../Helpers/backend";

interface IEventForDialogProps {
  event: IEditingEvent | null;
  calendars: ICalendar[];
  onCancel: () => void;
  onSave: () => void;
}

interface IValidationErrors {
  [field: string]: string;
}

export default function EventFormDialog(props: IEventForDialogProps) {
  const [event, setEvent] = useState<IEditingEvent | null>(props.event);
  const [errors, setErrors] = useState<IValidationErrors>({});
  const inputDate = useRef<HTMLInputElement | null>();
  const inputDesc = useRef<HTMLInputElement | null>();

  useEffect(() => {
    setEvent(props.event);
    setErrors({});
  }, [props.event]);

  const isNew = !event?.id;

  function validate(): boolean {
    if (event) {
      const currentErrors: IValidationErrors = {};
      if (!event.date) {
        currentErrors["date"] = "A data deve ser preenchida";
        inputDate.current?.focus();
      }
      if (!event.desc) {
        currentErrors["desc"] = "A descrição deve ser preenchida";
        inputDesc.current?.focus();
      }
      setErrors(currentErrors);
      return Object.keys(currentErrors).length === 0;
    }
    return false;
  }

  function save(evt: React.FormEvent) {
    evt.preventDefault();
    if (event) {
      if (validate()) {
        if (isNew) {
          createEventEndpoint(event).then(props.onSave);
        } else {
          updateEventEndpoint(event).then(props.onSave);
        }
      }
    }
  }

  function deleteEvent() {
    if (event) {
      deleteEventEndpoint(event.id!).then(props.onSave);
    }
  }

  return (
    <div>
      <Dialog
        open={!!event}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={save}>
          <DialogTitle>{isNew ? "Criar Evento" : "Editar Evento"}</DialogTitle>
          <DialogContent>
            {event && (
              <>
                <TextField
                  inputRef={inputDate}
                  margin="normal"
                  label="Data"
                  type="date"
                  value={event.date}
                  onChange={(evt) =>
                    setEvent({ ...event, date: evt.target.value })
                  }
                  fullWidth
                  error={!!errors.date}
                  helperText={errors.date}
                  variant="standard"
                />
                <TextField
                  autoFocus
                  inputRef={inputDesc}
                  margin="normal"
                  label="Descrição"
                  value={event.desc}
                  onChange={(evt) =>
                    setEvent({ ...event, desc: evt.target.value })
                  }
                  fullWidth
                  error={!!errors.desc}
                  helperText={errors.desc}
                  variant="standard"
                />
                <TextField
                  type="time"
                  margin="normal"
                  label="Hora"
                  value={event.time ?? ""}
                  onChange={(evt) =>
                    setEvent({ ...event, time: evt.target.value })
                  }
                  fullWidth
                  variant="standard"
                />
                <FormControl fullWidth>
                  <InputLabel id="select-calendar">Agenda</InputLabel>
                  <Select
                    labelId="select-calendar"
                    label="Age"
                    value={event.calendarId}
                    onChange={(evt) =>
                      setEvent({
                        ...event,
                        calendarId: evt.target.value as string,
                      })
                    }
                  >
                    {props.calendars.map((calendar) => (
                      <MenuItem key={calendar.id} value={calendar.id}>
                        {calendar.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {!isNew && (
              <Button onClick={deleteEvent} color="error">
                Excluir
              </Button>
            )}
            <Button onClick={props.onCancel} color="error">
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
