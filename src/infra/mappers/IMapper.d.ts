export type IMapper<DTO = any, Entity = any> = {
  toEntity: (dto: DTO) => Entity;
  toDto: (entity: Entity) => DTO;
};
