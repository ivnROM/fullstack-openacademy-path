import axios from "axios";
const baseurl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseurl);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
  const request = axios.post(baseurl, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (person) => {
  const request = axios.delete(`${baseurl}/${person.id}`, { data: person });
  return request.then((response) => response.data);
};

const replacePersonNumber = (person, newNumber) => {
  const changedPerson = { ...person, number: newNumber };
  const request = axios.put(`${baseurl}/${person.id}`, changedPerson);
  return request.then((response) => response.data);
};

export default {
  getAll,
  createPerson,
  deletePerson,
  replacePersonNumber,
};
