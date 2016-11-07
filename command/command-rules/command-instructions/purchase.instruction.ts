import { Purchase } from '../../../interfaces'
import { CommandRule, CommandResponse } from '../';
import { BaseInstruction, CommandInstructionOptions, CommandInstruction } from './';

export class PurchaseInstruction extends BaseInstruction {
  public budgetLeft: number;
  constructor(opts: CommandInstructionOptions,
    public budgetTransactionRef: firebase.database.Reference,
    public purchase: Purchase) {
    super(opts);
    this.execute = this.execute.bind(this);
    this.response = this.response.bind(this);
  }

  /**
   * This instruction deducts the purchase cost from the monthly budget before
   * the fanout occurs.
   */
  execute(): firebase.Promise<CommandInstruction> {
    return this.budgetTransactionRef.once('value')
      .then(snap => {
        const amounts = snap.val();
        return this.budgetTransactionRef.child('left').transaction((current) => {
          // Deduct the amount left
          return (current || 0) - this.purchase.cost;
        });
      }).then(txn => {
        this.budgetLeft = txn.snapshot.val();
        return super.execute();
      });
  }

  response() {
    return new Promise<CommandResponse>((resolve, reject) => {
      resolve({
        status: 200,
        body: `Saved! You now have ${this.budgetLeft} left on the month!`
      })
    });
  }
}