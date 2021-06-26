import {
  conStatusDocumentToFullDto,
  FullConservationStatusDto,
} from '../../dto/conservation-status/full-conservation-status.dto';
import { UpdateConservationStatusDto } from '../../dto/conservation-status/update-conservation-status.dto';
import { ConservationStatus } from '../../models/conservation-status';
import { ConservationStatusNotFoundError } from './conservation-status-not-found-error';

export async function updateConservationStatus(
  statusInfo: UpdateConservationStatusDto,
): Promise<FullConservationStatusDto | ConservationStatusNotFoundError> {
  const { id: classId, ...data } = statusInfo;
  try {
    const document = await ConservationStatus.findByIdAndUpdate(
      classId,
      data,
    ).exec();

    if (!document) {
      return new ConservationStatusNotFoundError(classId);
    }

    return conStatusDocumentToFullDto(document);
  } catch (err: any) {
    return new ConservationStatusNotFoundError(classId);
  }
}
