import { CreateAtomicPropDto } from '@/dtos/atomicProps.dto';
import { HttpException } from '@exceptions/HttpException';
import { AtomicProp } from '@/interfaces/atomicProps.interface';
import atomicPropsModel from '@models/atomicProps.model';
import { isEmpty } from '@utils/util';
import elementsModel from '@/models/elements.model';

/**
 * Atomic Properties (Атомные свойства) bo'limi.
 * Barchasi sodda murakkab logika yozilmagan
 */
export default class AtomicPropService {
  public atomicProps = atomicPropsModel;
  public elements = elementsModel;

  public async findAllAtomicProp(query: object): Promise<AtomicProp[]> {
    return await this.atomicProps.find(query).select('-__v');
  }

  public async findAtomicPropById(atomicPropId: string): Promise<AtomicProp> {
    if (isEmpty(atomicPropId)) throw new HttpException(400, 'AtomicPropId is empty');

    const findAtomicProp: AtomicProp = await this.atomicProps.findOne({ _id: atomicPropId }).select('-__v');
    if (!findAtomicProp) throw new HttpException(409, "AtomicProp doesn't exist");

    return findAtomicProp;
  }

  public async createAtomicProp(atomicPropData: CreateAtomicPropDto): Promise<AtomicProp> {
    if (isEmpty(atomicPropData)) throw new HttpException(400, 'atomicPropData is empty');

    return await this.atomicProps.create(atomicPropData);
  }

  public async updateAtomicProp(atomicPropId: string, atomicPropData: CreateAtomicPropDto): Promise<AtomicProp> {
    if (isEmpty(atomicPropData)) throw new HttpException(400, 'atomicPropData is empty');

    const updateAtomicPropById: AtomicProp = await this.atomicProps.findByIdAndUpdate(atomicPropId, atomicPropData, { new: true }).select('-__v');

    if (!updateAtomicPropById) throw new HttpException(409, "AtomicProp doesn't exist");

    return updateAtomicPropById;
  }

  public async deleteAtomicProp(atomicPropId: string): Promise<AtomicProp> {
    const findElement = await this.elements.findOne({ atomicProp: atomicPropId });

    if (findElement) throw new HttpException(400, 'Atomic prop uses a collection of elements');

    const deleteAtomicPropById: AtomicProp = await this.atomicProps.findByIdAndDelete(atomicPropId).select('-__v');
    if (!deleteAtomicPropById) throw new HttpException(409, "AtomicProp doesn't exist");

    return deleteAtomicPropById;
  }
}
