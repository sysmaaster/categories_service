
import db from "../schema/categories.schema";
import { CategoriesCreateModel } from "../models/categoriesCreate.model";
import { CategoriesEditRequestModel } from "../models/categoriesEditRequest.model";
import log from "../services/pino-logger.service";
import ErrorException from "../exceptions/error.exception";
import getCrypto from "../utils/crypto.gen";

class CategoriesRepositry {
  async getAll() {
    
    
    try {
      const result = await db.find({});
      let filter = result.map((el) => {
        return { id: el.id, name: el.name };
      });
      
      return filter;
    } catch (e) {
      
      throw e;
    }
  }

  async getById(input: string) {
    
    
    try {
      let filter;
      if (typeof input === "string") {
        const result = await db.findOne({ id: input });
        if (result) filter = { id: result.id, name: result.name };
        
        return filter;
      } else {
        throw new ErrorException(400, "getById", "BAD REQEST");
      }
    } catch (e) {
      
      throw e;
    }
  }

  async Create(input: CategoriesCreateModel) {
    
    
    try {
      let filter;
      let obj = {
        id: getCrypto(),
        name: input.name,
      };
      const result = await db.create(obj);
      if (result) filter = { id: result.id, name: result.name };
      
      return filter;
    } catch (e) {
      
      throw e;
    }
  }

  async Update(upd: CategoriesEditRequestModel,id:string) {
   
    
    try {
      let filter;
      const udp_data = {
        name: upd.name,
      };
      const result = await db.findOneAndUpdate({ id }, udp_data, {
        new: true,
      });
      if (result) filter = { id: result.id, name: result.name };
      
      return filter;
    } catch (e) {
      
      throw e;
    }
  }

  async Delete(id: string) {
    
    
    try {
      const result = await db.findOneAndDelete({ id });
      
      return result;
    } catch (e) {
      
      throw e;
    }
  }
}
export default new CategoriesRepositry();
