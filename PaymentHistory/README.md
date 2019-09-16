# Program created using Node

## Control:
Start - node app  
Tests - npm test

### Description:
Calculated commission fees for each operation using API configurations. In each line only final calculated commission fee must be provided without currency.

Input:
```
[
  { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } },
  { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
  { "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } },
]
```
Output:   
  
0.06  
0.90  
87.00  

