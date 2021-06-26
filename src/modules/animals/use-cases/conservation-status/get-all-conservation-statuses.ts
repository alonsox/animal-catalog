import {
  BaseConservationStatusDto,
  conStatusDocumentToBaseDto,
} from '../../dto/conservation-status/base-conservation-status.dto';
import { ConservationStatus } from '../../models/conservation-status';

export async function getAllConservationStatuses(): Promise<
  BaseConservationStatusDto[]
> {
  const statuses = await ConservationStatus.find({});

  return statuses.map(conStatusDocumentToBaseDto);
}
