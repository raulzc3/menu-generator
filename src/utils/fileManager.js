import { randomId } from "@mantine/hooks";
import moment from "moment";

/**
 * Get all menus from localStorage
 * @param {*} param0
 * @returns
 */
function getAllFiles() {
  return JSON.parse(localStorage.getItem("storedMenus")) || [];
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
 * Save menú in localStorage
 * @param {*} param0
 * @returns
 */
function storeFile({ id, type, name, title, data }) {
  const allFiles = getAllFiles();
  const fileId = id || randomId();

  // If menu exists, update menu
  if (id) {
    const originalFileIndex = allFiles.findIndex((file) => file.id === id);
    const originalFile = allFiles[originalFileIndex];
    allFiles[originalFileIndex] = {
      ...originalFile,
      name: name,
      title: title,
      type: type,
      saved: moment().toISOString(),
      data: data,
    };
  } else {
    allFiles.push({
      id: fileId,
      name: name,
      title: title,
      type: type,
      saved: moment().toISOString(),
      data: data,
    });
  }

  const updatedFiles = JSON.stringify(allFiles);

  localStorage.setItem("storedMenus", updatedFiles);
  return fileId;
}

export { getAllFiles, storeFile, findFile };
