git push origin HEAD:xiaming-dev。

```js
const uploadFile=(file)=>{
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.warning('只能选择JPG/PNG文件!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.warning('图片大小需要小于10MB!');
      return false;
    }
    setLoading([true,false]);
    dispatch({type:'project/getUrl',payload:{file},callback:(data)=>{
          if(data&&data.code==0)
          { 
            setList([file]);
            getBase64(file,(imgUrl)=>{setImgUrl(imgUrl)});
            setLoginPicUrl(data.data);
            message.success('图片上传成功');
          }
          else
          {
            message.error('图片上传失败！请再次尝试');
          }
          setLoading([false,false]);
    }})
    return false;
  }
```

```js
import { saveSearchParams, getSearchParams } from '@/utils/utils'

const getParams = JSON.parse(sessionStorage.getItem(window.location.pathname));

useState(getParams?.limit || 10);
         
useState(getParams?.offset || 0);

const getParams = JSON.parse(sessionStorage.getItem(window.location.pathname));
const [offset, setOffset] = useState(getParams?.limit || 10);
const [limit, setLimit] = useState(getParams?.offset || 0);

getSearchParams(form)

saveSearchParams({...values,limit,offset});

pageSize:limit,
```

```js
企业硬件管理  basetable pageNum\size



```



```json
 {
      "acuteToxicity": "string",
      "background": "string",
      "batchNum": "string",
      "brand": "乙醇",
      "cabSerialNo": "string",
      "cabinetId": "123",
      "cabinetName": "XX智能柜",
      "cabinetType": "存储柜",
      "casNo": "string",
      "catNo": "string",
      "categoryId": 0,
      "chemicalExpression": "string",
      "consistency": "string",
      "corrosivity": "string",
      "currentPosition": "string",
      "customField": "string",
      "customFields": [
        "string"
      ],
      "description": "string",
      "divNum": 3,
      "enName": "英文名",
      "environmentHazards": "string",
      "explode": "string",
      "flammableCabinets": "string",
      "floorNum": 2,
      "healthHazards": "string",
      "highPressureGas": "string",
      "id": 123,
      "inChDangerDir": "string",
      "inStorage": 0,
      "inflammable": "string",
      "isApply": 1,
      "isChemical": 0,
      "isHarmful": 1,
      "isReceive": 0,
      "locationName": "位置",
      "margin": "10.2",
      "measurement": "string",
      "monitoringTargetLocation": "string",
      "name": "乙醇",
      "num": 0,
      "otherHazards": "string",
      "oxidability": "string",
      "receStatus": 1,
      "receTime": 1234567890,
      "receiverName": "string",
      "remainNum": 0,
      "rfid": "string",
      "shelfTime": 1234567890,
      "spec": "500",
      "status": 1,
      "time": 1234567890,
      "type": "醇",
      "uniqueCode": "string",
      "userName": "string",
      "weight": "初始重量",
      "willExpire": 1
    }
```





