#include <jupiter/types.hpp>

#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

using namespace eosio;
using namespace types;

using std::string;
using std::vector;

class [[eosio::contract]] jupiter : public eosio::contract
{
    using contract::contract;

    public:
    jupiter(name receiver, name code, datastream<const char *> ds) : 
        contract(receiver, code, ds), 
        warriors(receiver, code.value), 
        ships(receiver, code.value) {}

    warrior_index warriors;
    ship_index ships;

    [[eosio::action]]
    void crwarrior(string warrior_name, string colony, string race);

    [[eosio::action]]
    void addship(uint64_t ship_id, uint64_t warrior_id);

    [[eosio::action]]
    void createship(string ship_name);
};

EOSIO_DISPATCH(jupiter, (crwarrior)(addship)(createship));