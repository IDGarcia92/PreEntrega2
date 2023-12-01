/* 
Los managers se encargan de manejar la lógica del crud:
create
read 
update
delete
(tanto en memoria como en archivos con fs).
*/

import { promises as fsPromises } from 'fs';

class ProductManager {
    constructor(jsonFilePath) {
        this.jsonFilePath = jsonFilePath;
        this.products = [];
        this.lastId = 0;
        this.init();
    };

    async init() {
        try {
            await fsPromises.access(this.jsonFilePath);
            const data = await fsPromises.readFile(this.jsonFilePath, 'utf-8');
            this.products = JSON.parse(data);
            this.lastId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        } catch (error) {
            console.error('Error al inicializar ProductManager:', error);
            await await this.saveData();
        };
    };
};

