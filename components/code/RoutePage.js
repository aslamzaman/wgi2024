
const RoutePage = (tbl, datas) => {

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
    
    
    export const GET = async () => {
      try {
        await Connect();
        const ${tbl}s = await ${titleCase(tbl)}Model.find({}).sort({_id:'desc'});
        return NextResponse.json( ${tbl}s );
      } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ message: 'Failed to fetch ${tbl}s' }, { status: 500 });
      }
    }
    
    
    
    export const POST = async (Request) => {
      try {
        await Connect();
        const { ${obj} } = await Request.json();
        const ${tbl}s = await ${titleCase(tbl)}Model.create({ ${obj} });
        return NextResponse.json(${tbl}s);
      } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "POST Error", err }, { status: 500 });
      }
    }`;

    return str;

}

export default RoutePage;