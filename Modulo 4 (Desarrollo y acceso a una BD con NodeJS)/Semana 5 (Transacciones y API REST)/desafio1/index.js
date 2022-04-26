//CREATE DATABASE desafioBanco;
//CREATE TABLE transferencias (descripcion varchar(50) not null, fecha varchar(10) not null, monto int not null, cuenta_origen INT not null, cuenta_destino INT not null);
//CREATE TABLE cuentas (id INT primary key, saldo DECIMAL CHECK (saldo >= 0) );

// INSERT INTO cuentas values (1, 20000);
// INSERT INTO cuentas values (2, 10000);

const {Pool} = require('pg');

const pool = new Pool({
    user: "rodrigo",
    host: "localhost",
    password: "1q2w3e4r",
    database: "desafiobanco",
    port: 5432
});

const argumentos = process.argv.slice(2);
const funcion = argumentos[0];
const cuenta_origen = argumentos[1];
const cuenta_destino = argumentos[2];
const fecha = argumentos[3];
const monto = argumentos[4];
const descripcion = argumentos[5];

//Función para agregar una transferencia
const nuevaTransferencia = async () => {
    const actualizarCuentaOr = {
        text: `UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2 RETURNING *`,
        values: [monto, cuenta_origen]
    }

    const actualizarCuentaDes = {
        text: `UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2 RETURNING *`,
        values: [monto, cuenta_destino]
    }

    const nuevaTransf = {
        text: 'INSERT INTO transferencias values ($5, $3, $4, $1, $2) RETURNING *',
        values: [cuenta_origen, cuenta_destino, fecha, monto, descripcion]
    }

    try {
        await pool.query('BEGIN');
        const resultado = await pool.query(nuevaTransf);
        await pool.query(actualizarCuentaOr);
        await pool.query(actualizarCuentaDes);
        await pool.query('COMMIT');
        console.log('Transferencia realizada');
        console.log('Ultima transferencia registrada: ', resultado.rows[0]);
    } catch (e) {
        await pool.query('ROLLBACK');
        
        console.log("Error código: " + e.code);
        
        console.log("Detalle del error: " + e.detail);
        
        console.log("Tabla originaria del error: " + e.table);
        
        console.log("Restricción violada en el campo: " + e.constraint);
    }finally{
        pool.end();
    }
};

//Función para consultar las últimas transferencias
const consultaTransferencia = async () => {
    
    try {
        const respuesta = await pool.query(`SELECT * FROM transferencias WHERE cuenta_origen = ${cuenta_origen} LIMIT 10`);
        console.log(`Ultimas 10 transferencias de la cuenta ${cuenta_origen} son: `);
        console.log(respuesta.rows);
    } catch (e) {
        console.log("Error código: " + e.code);
        
        console.log("Detalle del error: " + e.detail);
        
        console.log("Tabla originaria del error: " + e.table);
        
        console.log("Restricción violada en el campo: " + e.constraint);
    }finally{
        pool.end();
    }
}

//Función para consultar el saldo
const consultaSaldo = async () => {
    
    try {
        const {rows: [{saldo}]} = await pool.query(`select * from cuentas where id = ${cuenta_origen}`);
        console.log(`El saldo de la cuenta ${cuenta_origen} es: ${saldo}`);
    } catch (e) {
        console.log("Error código: " + e.code);
        
        console.log("Detalle del error: " + e.detail);
        
        console.log("Tabla originaria del error: " + e.table);
        
        console.log("Restricción violada en el campo: " + e.constraint);
    }finally{
        pool.end();
    }
}

(async () => {
    try {
        if (funcion === 'nueva') {
            await nuevaTransferencia();
        }else if(funcion === 'consulta')
        {
            await consultaTransferencia();
        }else if(funcion ==='saldo')
        {
            await consultaSaldo(); 
        }else{
            console.log("Funcion incorrecta");
        }
    } catch (e) {
        console.log("Error código: " + e.code);
        
        console.log("Detalle del error: " + e.detail);
        
        console.log("Tabla originaria del error: " + e.table);
        
        console.log("Restricción violada en el campo: " + e.constraint);
    }finally{
        //Comentado porque provoca un error
        //pool.end();
    }
})();