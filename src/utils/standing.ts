import { STAKE_FEE } from './constants'; 

export const standing = (validator: any): string => {
  if(!validator.active) {
    return "Exited";
  } else if(validator.deactivated || validator.slashFee > 0) {
    return "Forced Exit";
  } else if (!validator.firstBlockProposed) {
    return "N/A";
  } else if (validator.firstMissedProposal && STAKE_FEE.eq(validator.stake) && validator.slashMiss === 0){
    return "Okay";
  } else if (!STAKE_FEE.eq(validator.stake) || validator.slashMiss > 0){
    return "Bad";
  }
  return "All Good";
};

export const status = (validator: any): string => {
  if(validator.active) {
    return validator.firstBlockProposed ? "Active" : "Awaiting Activation";
  } else if(validator.deactivated) {
    return "Deactivated";
  } else if(!validator.active) {
    return "Exited";
  }
};
