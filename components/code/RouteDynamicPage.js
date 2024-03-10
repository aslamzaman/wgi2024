
const RouteDynamicPage = (tbl, datas) => {

    const titleCase = (str) => {
        return str
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const replaceQutation = datas.replaceAll('`', '');
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());

    let obj = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? obj +=  `${d}`
                : obj +=  `${d}, `
        }
    });

    let str = `    import { NextResponse } from 'next/server';
    import { Connect } from '@/lib/utils/Db';
    import { ${titleCase(tbl)}Model } from '@/lib/models/${titleCase(tbl)}Model';
    
    
    export const GET = async (Request, { params }) => {
      try {
        await Connect();
        const { id } = params;
        const ${tbl}s = await PostModel.findById(id);
        return NextResponse.json(${tbl}s);
      } catch (err) {
        return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
      }
    }    
    
    
    export const PUT = async (Request,{ params }) => {
      try {
        await Connect();
        const {id} = params;
        const { ${obj} } = await Request.json();
        const ${tbl}s = await ${titleCase(tbl)}Model.findOneAndUpdate({ _id: id }, { ${obj} });
        return NextResponse.json(${tbl}s);
      } catch (err) {
        return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
      }
    }
    
    
    export const DELETE = async ( Request, { params }) => {
      try {
        await Connect();
        const {id} = params;
        const ${tbl}s = await ${titleCase(tbl)}Model.findOneAndDelete({_id: id});
        return NextResponse.json(${tbl}s);
      } catch (err) {
        return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
      }
    } `;

    return str;

}

export default RouteDynamicPage;