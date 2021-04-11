import { STUDENT_MESSAGE} from "../actions/types";

const initialState = {

    totalmessagedata:''

};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STUDENT_MESSAGE:
      return { totalmessagedata: payload };

 

    default:
      return state;
  }
}
