export abstract class ResponseTransformer<Entity> {
  protected abstract implements(entity: Entity): any;

  protected abstract toArray(entity: Entity): any;

  item(entity: Entity) {
    return { ...this.toArray(entity), ...this.implements(entity) };
  }

  items(entities: Entity[]) {
    const response = [];
    for (const entity of entities) {
      response.push(this.toArray(entity));
    }
    return response;
  }
}
