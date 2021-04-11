import { MENTOR_MESSAGE} from "../actions/types";

const initialState = {

    totalmessagedata:''

};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MENTOR_MESSAGE:
      return { totalmessagedata: payload };

 

    default:
      return state;
  }
}
