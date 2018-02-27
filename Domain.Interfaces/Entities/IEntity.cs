namespace Domain.Interfaces.Entities
{
    public interface IEntity<TKey> : IBaseEntity
    {
        /// <summary>
        /// Идентификатор объекта
        /// </summary>
        TKey Id { get; set; }
    }
}
