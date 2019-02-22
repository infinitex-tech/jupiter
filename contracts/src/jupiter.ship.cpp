using namespace types;

void jupiter::createship(string ship_name)
{
    ships.emplace(get_self(), [&](auto &row) {
        row.id = ships.available_primary_key();
        row.ship_name = ship_name;
    });
}