import * as yup from "yup";

const taskValidationSchema = yup.object({
  taskName: yup
    .string()
    .min(3, "Minimum 3 letters")
    .max(50)
    .required("Required"),
  dueDate: yup.date().default(() => new Date()),
  status: yup.string().default("New").required("Required"),
  priorityLevel: yup.number().oneOf([1, 2, 3]).required("Required"),
  assignedUser: yup.string().required(),
  description: yup.string().optional(),
});

export default taskValidationSchema;
