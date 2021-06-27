import {
  BasicConservationStatusDto,
  toBasicConservationStatusDto,
} from '../../dto/conservation-status/basic-conservation-status.dto';
import { ConservationStatus } from '../../models/conservation-status';

export async function getAllConservationStatuses(): Promise<
  BasicConservationStatusDto[]
> {
  const statuses = await ConservationStatus.find({})
    .select('-description')
    .lean();

  return statuses.map(toBasicConservationStatusDto);
}
