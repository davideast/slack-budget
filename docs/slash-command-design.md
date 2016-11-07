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
9. Get current left on the month
10. Get current spent in category

## Command API
The name is `/spent`. Using a `+` will indicate a category. The `$` will indicate the cost. The `at` will indicate the place. The `on` will indicate the date and time. If there is no `on` then the current date and time is used. Set the current month's budget with a `*current`. Asking `How much?` will return the total spent on the month. Asking `How much +category?` will return how much you've spent on that category this month. Asking `How much is left?` will return the current budget on the month. Entering `history` will return the total lifetime spent.

```slack
/spent +specialty $21.03 at Market Hall
/spent +eatingout $34.16 at Long Bridge Pizza
/spent +specialty $21.03 at Market Hall on 11/03 6:03pm
/spent +skateboarding $25.00 at Shredquarters
/spent add +football 
/spent +football $200 on NFL Sunday Ticket
/spent *current 150.00 
/spent How much?
/spent How much +football?
/spent How much is left?
/spent history
```

### Data Structure
The primary shared key is the user's `uid`. Each month has a budget amount, therefore `$year_month` makes a unique key for recording purchases in that month.

`users` - Records user data.
`amounts` - Records the amount per team per month
`budgets` - Records the purchases per team per month
`specifics` - Records the purchases per category per team
`categories` - Records the category of purchase (acts as a foreign key)
`history` - Records all flattened purchases per team

```json
{
   "users": {
      "$uid": {
         "username": "String"
      }
   },
   "amounts": {
      "$teamId": {
         "$year_month": 200
      }
   },
   "budgets": {
      "$teamId": {
         "$year_month": {
            "$purchaseId": {
               "uid": "1",
               "amount": 21.03,
               "name": "String",
               "location": "String",
               "timestamp": 125125913
            }
         }
      }
   },
   "specifics": {
      "$teamId": {
         "$categoryId": {
            "$year_month": {
               "$purchaseId": {
                  "uid": "1",
                  "amount": 21.03,
                  "name": "String",
                  "location": "String",
                  "timestamp": 125125913,
                  "yearmonth": "2016_11"
               }
            }
         }
      }
   },
   "categories": {
      "$teamId": {
         "$categoryId": "String"
      }
   },
   "history": {
      "$teamId": {
         "$purchaseId": {
            "uid": "1",
            "amount": 21.03,
            "name": "String",
            "location": "String",
            "timestamp": 125125913            
         }
      }
   },
   "userHistory": {
     "$uid": {
        "$purchaseId": {
           "uid": "1",
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
3. Check amount for current month (if over, send response)
4. Write to user's current budget
5. Write to category's specifics on the month
6. Write to history
