import { randomId } from "@mantine/hooks";
import moment from "moment";

/**
 * Get all menus from localStorage
 * @param {*} param0
 * @returns
 */
function getAllFiles() {
  return (
    JSON.parse(localStorage.getItem("storedMenus"))?.sort(
      (b, a) => Number(a.saved) - Number(b.saved)
    ) || []
  );
}

/**
 * Get one menu from menu list or localStorage
 * @param {*} param0
 * @returns
 */
function findFile({ id, files = getAllFiles() }) {
  return files.find((file) => file.id === id);
}

/**
 * Duplicate one file
 * @param {*} fileId
 */
function duplicateFile(fileId, t) {
  const { id, name, ...fileData } = findFile({ id: fileId });
  const newName = name + " - " + t("generic_copy");
  storeFile({ name: newName, ...fileData });
}

/**
 * Save menú in localStorage
 * @param {*} param0
 * @returns
 */
function storeFile({ id, type, name, title, data }) {
  const allFiles = getAllFiles();
  const fileId = id || randomId();
  let savedFile = {};
  const now = moment().format("YYYYMMDDHHmmss");

  // If menu exists, update menu
  if (id) {
    const originalFileIndex = allFiles.findIndex((file) => file.id === id);
    const originalFile = allFiles[originalFileIndex];
    savedFile = {
      ...originalFile,
      name: name,
      title: title,
      type: type,
      saved: now,
      data: data,
    };
    allFiles[originalFileIndex] = savedFile;
  } else {
    savedFile = {
      id: fileId,
      name: name,
      title: title,
      type: type,
      saved: now,
      data: data,
    };
    allFiles.push(savedFile);
  }
  const updatedFiles = JSON.stringify(allFiles);

  localStorage.setItem("storedMenus", updatedFiles);
  return savedFile;
}

/**
 * Delete one menu from localStorage
 * @param {*} param0
 * @returns
 */
function deleteFile(id) {
  if (id) {
    const allFiles = getAllFiles();
    allFiles.splice(
      allFiles.findIndex((file) => file.id === id),
      1
    );
    const updatedFiles = JSON.stringify(allFiles);
    localStorage.setItem("storedMenus", updatedFiles);
  }
}

export { getAllFiles, storeFile, findFile, deleteFile, duplicateFile };
