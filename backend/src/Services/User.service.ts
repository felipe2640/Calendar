import PrismaService from "./Prisma.service";
import { ICreateUser, ICalendar, IEvent } from "../Models/models.auth";

export class UsersService {
  private prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
  }

  async findOne({
    email,
  }: {
    email: string;
  }): Promise<ICreateUser | undefined> {
    const user = await this.prismaService.Users({ email }).then(
      (value: any) => value,
      (err: any) => console.log(err)
    );
    return user;
  }
  async eventsUSer({
    email,
  }: {
    email: string;
  }): Promise<IEvent[] | undefined> {
    const eventsUser = await this.prismaService.Events({ email }).then(
      (value: any) => value,
      (err: any) => console.log(err)
    );
    return eventsUser;
  }
  async calendarsUSer({
    email,
  }: {
    email: string;
  }): Promise<ICalendar[] | undefined> {
    const userCalendar = await this.prismaService.Calendars({ email }).then(
      (value: any) => value,
      (err: any) => console.log(err)
    );
    return userCalendar;
  }
  async createOne({ CreateUser }: { CreateUser: ICreateUser }): Promise<any> {
    const user = await this.prismaService.CreateUser(CreateUser).then(
      (value: any) => value,
      (err: any) => console.log(err)
    );
    return user;
  }
}
