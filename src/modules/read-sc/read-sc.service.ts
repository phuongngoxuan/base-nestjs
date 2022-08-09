// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { abiBase } from 'src/abis/Base.json';
import { AbiItem } from 'web3-utils';
import { BlockInfoDto } from './dto/bock-infos.dto';

@Injectable()
export class ReadScService {
  public async getBlockInfo(block: number, rpc: string): Promise<BlockInfoDto> {
    const web3Provider = new Web3.providers.HttpProvider(rpc);
    const web3 = new Web3(web3Provider);
    let blockInfo: BlockInfoDto;
    // Get block can false not good for performance (pending)
    for (let i = 0; i < 100; i++) {
      blockInfo = await web3.eth.getBlock(block);
      if (blockInfo) return blockInfo;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `Couldn't find blockInfo`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  public async checkSumAddress(walletAddress: string): Promise<any> {
    const web3Provider = new Web3.providers.HttpProvider(process.env.RPC);
    const web3 = new Web3(web3Provider);
    const addressConvert = web3.utils.toChecksumAddress(walletAddress);
    if (addressConvert) return true;
  }

  public async getContractBase(): Promise<any> {
    const web3Provider = new Web3.providers.HttpProvider(process.env.RPC);
    const web3 = new Web3(web3Provider);
    const contractManger = new web3.eth.Contract(
      abiBase as AbiItem[],
      process.env.BASE_CONTRACT_ADDRESS,
    );
    return contractManger;
  }
}
