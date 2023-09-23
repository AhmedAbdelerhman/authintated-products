import { Injectable, Global } from '@nestjs/common';
import * as fs from 'fs/promises'; // Use 'fs/promises' for async/await functionality

@Injectable()
export class JsonService {
  async readData(filePath:string): Promise<any> {
    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      const jsonData = JSON.parse(fileData);
      return jsonData;
    } catch (error) {
      throw new Error('Error reading JSON file: ' + error.message);
    }

  }
}

