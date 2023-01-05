import { CreateElementPropDto } from '@/dtos/elementProps.dto';
import { HttpException } from '@exceptions/HttpException';
import { ElementProp } from '@/interfaces/elementProps.interface';
import elementPropsModel from '@models/elementProps.model';
import { isEmpty } from '@utils/util';
import elementsModel from '@/models/elements.model';

/**
 * Element Properties (свойства) bo'limi.
 * Barchasi sodda murakkab logika yozilmagan
 */
export default class ElementPropService {
  public elementProps = elementPropsModel;
  public elements = elementsModel;

  public async findAllElementProp(query: object): Promise<ElementProp[]> {
    return await this.elementProps.find(query).select('-__v');
  }

  public async findElementPropById(elementPropId: string): Promise<ElementProp> {
    if (isEmpty(elementPropId)) throw new HttpException(400, 'ElementPropId is empty');

    const findElementProp: ElementProp = await this.elementProps.findOne({ _id: elementPropId }).select('-__v');
    if (!findElementProp) throw new HttpException(409, "ElementProp doesn't exist");

    return findElementProp;
  }

  public async createElementProp(elementPropData: CreateElementPropDto): Promise<ElementProp> {
    if (isEmpty(elementPropData)) throw new HttpException(400, 'elementPropData is empty');

    return await this.elementProps.create(elementPropData);
  }

  public async updateElementProp(elementPropId: string, elementPropData: CreateElementPropDto): Promise<ElementProp> {
    if (isEmpty(elementPropData)) throw new HttpException(400, 'elementPropData is empty');

    const updateElementPropById: ElementProp = await this.elementProps
      .findByIdAndUpdate(elementPropId, elementPropData, { new: true })
      .select('-__v');

    if (!updateElementPropById) throw new HttpException(409, "ElementProp doesn't exist");

    return updateElementPropById;
  }

  public async deleteElementProp(elementPropId: string): Promise<ElementProp> {
    const findElement = await this.elements.findOne({ elementProp: elementPropId });

    if (findElement) throw new HttpException(400, 'Element prop uses a collection of elements');

    const deleteElementPropById: ElementProp = await this.elementProps.findByIdAndDelete(elementPropId).select('-__v');
    if (!deleteElementPropById) throw new HttpException(409, "ElementProp doesn't exist");

    return deleteElementPropById;
  }
}
