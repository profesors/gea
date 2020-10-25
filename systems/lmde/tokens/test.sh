#!/bin/bash
for f in *.json
do
	jsonlint-php $f
done
