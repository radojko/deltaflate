import { DecoderDictionaryStore } from '../../deltaflate-decode/src'
import { ApolloCache } from 'apollo-cache';

export class GraphQlDecoderDictionaryStore<TSerialized> implements DecoderDictionaryStore<TSerialized> {
  cache: ApolloCache<TSerialized>;

  constructor(cache: ApolloCache<TSerialized>) {
    this.cache = cache;
  }

  read(): Promise<Array<TSerialized>> {
    return Promise.resolve([this.cache.extract()]);
  }

  // add GET query support
  async write(decodedResponse: Response): Promise<void> {
    const decodedBody = await decodedResponse.clone().json();
    this.cache.restore(decodedBody);
  }
}
export default GraphQlDecoderDictionaryStore;