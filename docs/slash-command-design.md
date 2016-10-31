# Slash command design

## Requirements
1. Multi-user
2. Multiple months
3. Each month has a budget price
4. Multiple things you can set a budget for specialty, eatingout
5. Record date and time of purchase
6. Record place of purchase
7. Modify FKs
8. Set monthly budget

## Command API
The name is `/spent`. Using a `+` will indicate a category. The `$` will indicate the cost. The `at` will indicate the place. The `on` will indicate the date and time. If there is no `on` then the current date and time is used. Set the current month's budget with a `*current`.

```slack
/spent +specialty $21.03 at Market Hall
/spent +eatingout $34.16 at Long Bridge Pizza
/spent +specialty $21.03 at Market Hall on 11/03 6:03pm
/spent +skateboarding $25.00 at Shred quarters
/spent add +football 
/spent +football $200 on NFL Sunday Ticket
/spent *current 150.00 
```

### Data Structure
The primary shared key is the user's `uid`. Each month has a budget amount, therefore `$year_month` makes a unique key for recording purchases in that month.

`users` - Records user data.
`amounts` - Records the amount per user per month
`budgets` - Records the purchases per user per month
`specifics` - Records the purchases per category per user
`categories` - Records the category of purchase (acts as a foreign key)
`history` - Records all flattened purchases per user

```json
{
   "users": {
      "$uid": {
         "username": "String"
      }
   },
   "amounts": {
      "$uid": {
         "$year_month": 200
      }
   },
   "budgets": {
      "$uid": {
         "$year_month": {
            "$purchaseId": {
               "amount": 21.03,
               "name": "String",
               "location": "String",
               "timestamp": 125125913
            }
         }
      }
   },
   "specifics": {
      "$uid": {
         "$categoryId": {
            "$purchaseId": {
               "amount": 21.03,
               "name": "String",
               "location": "String",
               "timestamp": 125125913,
               "yearmonth": "2016_11"
            }
         }
      }
   },
   "categories": {
      "$uid": {
         "$categoryId": "String"
      }
   },
   "history": {
      "$uid": {
         "$purchaseId": {
            "amount": 21.03,
            "name": "String",
            "location": "String",
            "timestamp": 125125913            
         }
      }
   }
}
```

## Interfaces

### User

```ts
interface User {
   username: string;
}
```

### Amount
```ts
interface Amounts {
   yearmonth: string;
}
```

### Purchase

```ts
interface Purchase {
   amount: number;
   name: string;
   location: string;
   timestamp: number;
   category: string;
}
```

## Event Flow

Slack POST -> Server -> Firebase DB -> Slack

### Post Body
```
token=<token>
team_id=<teamid>
team_domain=example
channel_id=<channel_id>
channel_name=test
user_id=<user_id>
user_name=<username>
command=/spent
text=<text>
response_url=https://hooks.slack.com/commands/1234/5678
```

1. Get POST at `/queue`
1. Check params 
1. Write user entry
2. Parse POST text
3. Check category (if unknown, respond)
3. Check amount for current month (if over, send response)
4. Write to user's current budget
5. Write to category's specifics
6. Write to history
