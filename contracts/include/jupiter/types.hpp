#pragma once

#include <eosiolib/eosio.hpp>
#include <string>

using namespace eosio;

using std::string;

namespace types
{
    struct [[eosio::table]] warrior 
    {
        uint64_t id;
        string name;
        string colony;
        string race;
        uint64_t ship_id = -1;

        uint64_t primary_key() const { return id; }
    };

    typedef multi_index<"warrior"_n, warrior> warrior_index;


    struct [[eosio::table]] ship
    {
        uint64_t id;
        string ship_name;

        uint64_t primary_key() const { return id; }
    };

    typedef multi_index<"ship"_n, ship> ship_index;
}