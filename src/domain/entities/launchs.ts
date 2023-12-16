import { randomUUID } from "crypto";

interface LaunchProps {
  serviceId: String;
  value: Number;
  shiftId: String;
  projectId: String;
}

export class Launch {
  public id: String;
  public serviceId: String;
  public projectId: String;
  public shiftId: String;
  public value: Number;

  constructor(props: LaunchProps, id?: String) {
    this.id = id ?? randomUUID();
    this.serviceId = props.serviceId;
    this.projectId = props.projectId;
    this.value = props.value;
    this.shiftId = props.shiftId;
  }
}
