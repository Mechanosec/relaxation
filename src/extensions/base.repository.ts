export class BaseRepository {
    protected relations: string[] = [];

    setRelations(relations: string[]) {
        this.relations = relations;
        return this;
    }
}
