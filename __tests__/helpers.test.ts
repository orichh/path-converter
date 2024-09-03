import { getLocalPathFromUncPath, getUncPathFromLocalPath } from '@/app/helpers';

describe('Path conversion tests', () => {

    it('converts Local Path to UNC Path', () => {
        const localPath = "C:\\Users\\JohnDoe\\Documents\\file.txt";
        const expectedUNCPath = "\\\\localhost\\C$\\Users\\JohnDoe\\Documents\\file.txt";

        const result = getUncPathFromLocalPath(localPath);
        expect(result).toBe(expectedUNCPath);
    });

    it('converts Local Path to UNC Path with custom hostname', () => {
        const localPath = "D:\\Projects\\MyApp";
        const expectedUNCPath = "\\\\localhost\\D$\\Projects\\MyApp";

        const result = getUncPathFromLocalPath(localPath);
        expect(result).toBe(expectedUNCPath);
    });

    it('converts UNC Path to Local Path', () => {
        const uncPath = "\\\\localhost\\C$\\Users\\JohnDoe\\Documents\\file.txt";
        const expectedLocalPath = "C:\\Users\\JohnDoe\\Documents\\file.txt";

        const result = getLocalPathFromUncPath(uncPath);
        expect(result).toBe(expectedLocalPath);
    });

    it('converts UNC Path to Local Path with different drive letter', () => {
        const uncPath = "\\\\localhost\\D$\\Downloads\\setup.exe";
        const expectedLocalPath = "D:\\Downloads\\setup.exe";

        const result = getLocalPathFromUncPath(uncPath);
        expect(result).toBe(expectedLocalPath);
    });

});

