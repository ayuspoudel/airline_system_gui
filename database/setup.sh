#!/bin/bash
psql -U ayushpoudel -d airline_system -f Create.txt
psql -U ayushpoudel -d airline_system -f Inserts.txt
psql -U ayushpoudel -d airline_system -f Views.txt
psql -U ayushpoudel -d airline_system -f SP.txt
psql -U ayushpoudel -d airline_system -f TG.txt
psql -U ayushpoudel -d airline_system -f Update.txt

