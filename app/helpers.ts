export const getUncPathFromLocalPath = (localPath: string): string => {
  // Replace the backslashes with double backslashes for UNC format
  const uncPath = localPath.replace(/\\/g, "\\");

  // Add the hostname and the administrative share (e.g., "C$")
  const driveLetter = uncPath.charAt(0).toUpperCase();
  const unc = `\\\\localhost\\${driveLetter}$${uncPath.slice(2)}`;

  return unc;
};
export const getUncStringPathFromLocalPath = (localPath: string): string => {
  // Replace the backslashes with double backslashes for UNC format
  const uncPath = localPath.replace(/\\/g, "\\");

  // Add the hostname and the administrative share (e.g., "C$")
  const driveLetter = uncPath.charAt(0).toUpperCase();
  let unc = `\\\\localhost\\${driveLetter}$${uncPath.slice(2)}`;

  unc = unc.replace(/\\/g, "\\\\");
  return unc;
};

export const getLocalPathFromUncPath = (uncPath: string): string => {
  // Remove the initial double backslashes and split the path components
  const pathParts = uncPath.replace(/^\\\\/, "").split("\\");

  // Extract the drive letter and path
  const driveLetter = pathParts[1].replace("$", ":");
  const localPath = driveLetter + "\\" + pathParts.slice(2).join("\\");

  return localPath;
};
export const getLocalStringPathFromUncPath = (uncPath: string): string => {
  // Remove the initial double backslashes and split the path components
  const pathParts = uncPath.replace(/^\\\\/, "").split("\\");

  // Extract the drive letter and path
  const driveLetter = pathParts[1].replace("$", ":");
  let localPath = driveLetter + "\\" + pathParts.slice(2).join("\\");
  localPath = localPath.replace(/\\/g, "\\\\");

  return localPath;
};
