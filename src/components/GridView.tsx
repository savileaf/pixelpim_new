import React, { useState } from 'react';
import { FaFileAlt } from "react-icons/fa";
import { MdImage } from "react-icons/md";
import { RiFileExcelFill } from "react-icons/ri";
import { BiSolidFilePdf } from "react-icons/bi";
import { BsFileEarmarkWordFill } from "react-icons/bs";
import './gridview.css'

const GridView: React.FC = () => {

    return (
    <>
    <section className='assets-page'>
    <div className="main">
        <div className="asset-list-filter-wrapper">
            <div className="asset-list-filter">
            <div className="asset-list-wrapper">
            <div className="asset-list">
            <div className="asset-file">
            <img src="" alt="" />
             <div className="name">
                 <FaFileAlt size={14} color="#079B94" />
                 <p>Docs</p>
            </div>
            <div className="date-size">
            <p>06-5-2025</p>
            <p>21kb</p>
            </div>
            </div>
            <div className="asset-file">
            <img src="../../public/image1.png" alt="" />
            <div className="name">
                <MdImage size={14} color="#002D74" />
                <p>Docs</p>
                </div>
                <div className="date-size">
                <p>06-5-2025</p>
                <p>21kb</p>
                </div>
            </div>
            <div className="asset-file">
                                        <img src="../../public/image1.png" alt="" />
                                        <div className="name">
                                            <BiSolidFilePdf size={14} color="#079B94" />
                                            <p>Docs</p>
                                        </div>
                                        <div className="date-size">
                                            <p>06-5-2025</p>
                                            <p>21kb</p>
                                        </div>
             </div>
            <div className="asset-file">
             <img src="../../public/image1.png" alt="" />
            <div className="name">
            <BsFileEarmarkWordFill size={14} color="#079B94" />
            <p>Docs</p>
            </div>
            <div className="date-size">
             <p>06-5-2025</p>
            <p>21kb</p>
            </div>
            </div>
            <div className="asset-file">
            <img src="../../public/image1.png" alt="" />
            <div className="name">
            <FaFileAlt size={14} color="#079B94" />
            <p>Docs</p>
            </div>
            <div className="date-size">
            <p>06-5-2025</p>
            <p>21kb</p>
            </div>
            </div>
            <div className="asset-file">
            <img src="../../public/image1.png" alt="" />
            <div className="name">
            <RiFileExcelFill size={14} color="#079B94" />
            <p>Docs</p>
            </div>
            <div className="date-size">
            <p>06-5-2025</p>
            <p>21kb</p>
            </div>
         </div>
        </div>
        </div>

        </div>
        </div>
        <div className="bottom">
         <p className="total-asset">
            <span>266</span> Products
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GridView;