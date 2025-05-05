import api from "./index";

export const uploadTransactions = (formData: FormData) =>
  api.post("/upload/", formData);

export const fetchTransactions = () =>
  api.get("/transactions/");
