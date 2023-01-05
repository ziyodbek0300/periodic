import { HttpException} from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import elementsModel from '@/models/elements.model';
import electromagnetic_propsModel from '@models/electromagnetic_props.model';
import { ElectromagneticProps } from '@interfaces/electromagneticProps.interface';
import { CreateElectromagneticPropDto } from '@dtos/electromagneticProps.dto';

/**
 * Element Properties (свойства) bo'limi.
 * Barchasi sodda murakkab logika yozilmagan
 */
export default class ElectromagneticPropsService {
  public elementProps = electromagnetic_propsModel;
  public elements = elementsModel;

  public async findAllElementProp(query: object): Promise<ElectromagneticProps[]> {
    return this.elementProps.find(query).select('-__v');
  }

  public async findElementPropById(elementPropId: string): Promise<ElectromagneticProps> {
    if (isEmpty(elementPropId)) throw new HttpException(400, 'ElectromagneticProp is empty');

    const findElementProp: ElectromagneticProps = await this.elementProps.findOne({ _id: elementPropId }).select('-__v');
    if (!findElementProp) throw new HttpException(409, "ElectromagneticProp doesn't exist");

    return findElementProp;
  }

  public async createElementProp(elementPropData: CreateElectromagneticPropDto): Promise<ElectromagneticProps> {
    if (isEmpty(elementPropData)) throw new HttpException(400, 'elementPropData is empty');

    return await this.elementProps.create(elementPropData);
  }

  public async updateElementProp(elementPropId: string, elementPropData: CreateElectromagneticPropDto): Promise<ElectromagneticProps> {
    if (isEmpty(elementPropData)) throw new HttpException(400, 'elementPropData is empty');

    const updateElementPropById: ElectromagneticProps = await this.elementProps
      .findByIdAndUpdate(elementPropId, elementPropData, { new: true })
      .select('-__v');

    if (!updateElementPropById) throw new HttpException(409, "ElementProp doesn't exist");

    return updateElementPropById;
  }

  public async deleteElementProp(elementPropId: string): Promise<ElectromagneticProps> {
    const findElement = await this.elements.findOne({ electromagneticProps: elementPropId });

    if (findElement) throw new HttpException(400, 'Element prop uses a collection of elements');

    const deleteElementPropById: ElectromagneticProps = await this.elementProps.findByIdAndDelete(elementPropId).select('-__v');
    if (!deleteElementPropById) throw new HttpException(409, "ElementProp doesn't exist");

    return deleteElementPropById;
  }
}
