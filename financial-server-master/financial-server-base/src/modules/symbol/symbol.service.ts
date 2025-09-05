import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Symbol } from "./entities/symbol.entity";
import { BaseService } from "src/common/service/base.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SymbolService extends BaseService<Symbol> {
  constructor(
    @InjectRepository(Symbol)
    private symbolRepository: Repository<Symbol>,
  ) {
    super(symbolRepository);
  }
}
