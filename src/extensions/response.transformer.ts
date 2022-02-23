export class ResponseTransformer {
  toArray(entity: Promise<any>) {
    if (!entity) {
      return [];
    }
    return entity;
  }

  protected item(entity: Promise<any>) {
    return this.toArray(entity);
  }

  protected items(entities: Promise<any[]>) {
    return entities.then((entities) => {
      const response = [];
      for (const entity of entities) {
        response.push(this.toArray(entity));
      }
      return response;
    });
  }
}
