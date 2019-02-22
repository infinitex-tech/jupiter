using namespace types;

void jupiter::crwarrior(string warrior_name, string colony, string race)
{
    warriors.emplace(get_self(), [&](auto &row) {
        row.id = warriors.available_primary_key();
        row.name = warrior_name;
        row.colony = colony;
        row.race = race;
    });
}

void jupiter::addship(uint64_t ship_id, uint64_t warrior_id)
{
    auto shipIterator = ships.find(ship_id);
    eosio_assert(shipIterator != ships.end(), "Ship not found!");

    auto warriorIterator = warriors.find(warrior_id);
    eosio_assert(warriorIterator != warriors.end(), "Warrior not found!");

    warriors.modify(warriorIterator, get_self(), [&](auto &row) {
        row.ship_id = ship_id;
    });
}