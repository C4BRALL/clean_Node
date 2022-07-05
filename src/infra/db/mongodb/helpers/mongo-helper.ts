import { MongoClient } from "mongodb"

export const MongoHelper = {
  connection: null as MongoClient,
  
  async connect(url: string): Promise<void> {
    this.connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useSharedDBForAllJestWorkers: false,
    });
  },

  async disconnect(): Promise<void> {
    await this.connection.close()
  }
}