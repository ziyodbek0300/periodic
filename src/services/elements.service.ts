import { CreateElementDto } from '@/dtos/elements.dto';
import { HttpException } from '@exceptions/HttpException';
import { Element } from '@/interfaces/elements.interface';
import elementsModel from '@models/elements.model';
import { isEmpty } from '@utils/util';
import atomicPropsModel from '@/models/atomicProps.model';

/**
 * Elements bo'limi.
 * Barchasi sodda murakkab logika yozilmagan
 */
export default class ElementService {
  public elements = elementsModel;
  public atomicProps = atomicPropsModel;

  // elementlarni barchasi olish va boshqa collactionlardan kerakli bo'lgan maulotlarni o'zini olish
  public async findAllElement(query: object): Promise<Element[]> {
    return await this.elements
      .find(query)
      .populate([
        {
          path: 'atomicProp',
          select: 'electrConfig -_id',
        },
        {
          path: 'elementProp',
          select: 'atomicNumber atomicMass -_id',
        }
      ])
      .select('-__v');
  }

  public async findElementById(elementId: string): Promise<Element> {
    if (isEmpty(elementId)) throw new HttpException(400, 'ElementId is empty');

    const findElement: Element = await this.elements.findOne({ _id: elementId }).select('-__v');
    if (!findElement) throw new HttpException(409, "Element doesn't exist");

    return findElement;
  }

  public async createElement(elementData: CreateElementDto & Element): Promise<Element> {
    if (isEmpty(elementData)) throw new HttpException(400, 'elementData is empty');

    // atomic properties faqat bitta elementga biktira olish mumkin, bu yerda shu narsa tekshil moqda
    const findElement: Element = await this.elements.findOne({ atomicProp: elementData.atomicProp });
    if (findElement) throw new HttpException(400, 'This atomic prop is bound to the element');

    return await this.elements.create(elementData);
  }

  public async updateElement(elementId: string, elementData: CreateElementDto & Element): Promise<Element> {
    if (isEmpty(elementData)) throw new HttpException(400, 'elementData is empty');

    const findElement: Element = await this.elements.findOne({ _id: elementId });

    if (!findElement) throw new HttpException(409, "Element doesn't exist");

    // atomic properties faqat bitta elementga biktira olish mumkin, bu yerda shu narsa tekshil moqda
    const findOneElement: Element = await this.elements.findOne({ _id: { $ne: 20 }, atomicProp: elementData.atomicProp });
    if (findOneElement) throw new HttpException(400, 'This atomic prop is bound to the element');

    const updateElementById: Element = await this.elements.findByIdAndUpdate(elementId, elementData, { new: true }).select('-__v');

    return updateElementById;
  }

  public async deleteElement(elementId: string): Promise<Element> {
    const deleteElementById: Element = await this.elements.findByIdAndDelete(elementId).select('-__v');
    if (!deleteElementById) throw new HttpException(409, "Element doesn't exist");

    return deleteElementById;
  }
}
