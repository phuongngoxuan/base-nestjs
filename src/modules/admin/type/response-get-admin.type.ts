import { AdminEntity } from '../../../models/entities/admin-info.entity';
export class ResGetAdminType {
  data: AdminEntity[];
  total: number;
  page: number;
  last_page: number;
}
