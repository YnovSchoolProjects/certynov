import { sha256 } from "js-sha256";

export default {
    methods: {
        async hashFile(file) {
            let hash = null;

            try {
                const fileContent = await this.getFileContent(file);
                hash = sha256(fileContent);
            } catch (e) {
                console.error(e);
            }

            return hash;
        },
        /**
         * @param file
         * @returns {Promise<string>}
         */
        getFileContent(file) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();

                fileReader.onload = () => {
                    const data = fileReader.result.split(',')[1];
                    resolve(data);
                };
                fileReader.onerror = (error) => reject(error);

                fileReader.readAsDataURL(file);
            });
        }
    },
}