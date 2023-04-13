import {getIceCoffee} from '../../api/get-coffee';
import {UnfoldSagaAction, unfoldSaga} from '../config.saga';

export default function* (action: UnfoldSagaAction) {
  yield unfoldSaga(
    {
      handler: async () => {
        console.log('ICE COFFEE SAGA', action);
        const iceCoffees = await getIceCoffee();
        return iceCoffees;
      },
      key: action.type,
    },
    action.callbacks,
  );
}
