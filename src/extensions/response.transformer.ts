export abstract class ResponseTransformer<Entity> {
  protected abstract implements(entity: Entity): any;

  protected abstract toArray(entity: Entity): any;

  item(entity: Entity) {
    return { ...this.toArray(entity), ...this.implements(entity) };
  }

  items(entities: Entity[]) {
    const response = [];
    if (entities) {
      for (const entity of entities) {
        response.push(this.item(entity));
      }
    }
    return response;
  }
}
