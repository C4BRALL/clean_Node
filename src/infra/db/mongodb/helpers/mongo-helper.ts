import { Collection, MongoClient } from "mongodb"

export const MongoHelper = {
  connection: null as MongoClient,

  async connect(url: string): Promise<void> {
    this.connection = await MongoClient.connect(url);
  },

  async disconnect(): Promise<void> {
    await this.connection.close()
  },

  getCollection(name: string): Collection {
    return this.connection.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
