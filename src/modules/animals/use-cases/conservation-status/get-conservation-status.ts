import {
  conStatusDocumentToFullDto,
  FullConservationStatusDto,
} from '../../dto/conservation-status/full-conservation-status.dto';
import { GetConservationStatusDto } from '../../dto/conservation-status/get-conservation-status.dto';
import { ConservationStatus } from '../../models/conservation-status';
import { ConservationStatusNotFoundError } from './conservation-status-not-found-error';

export async function getConservationStatus(
  statusInfo: GetConservationStatusDto,
): Promise<FullConservationStatusDto | ConservationStatusNotFoundError> {
  const { id: statusId } = statusInfo;
  try {
    const document = await ConservationStatus.findById(statusId);

    if (!document) {
      return new ConservationStatusNotFoundError(statusInfo.id);
    }

    return conStatusDocumentToFullDto(document);
  } catch (err: any) {
    return new ConservationStatusNotFoundError(statusId);
  }
}
